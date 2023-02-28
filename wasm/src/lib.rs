// https://gist.github.com/landhb/4df399c453e83ce2188159975bd00192
use base64::{engine::general_purpose, Engine};
use ring::aead::{
	Aad, Algorithm, BoundKey, Nonce, NonceSequence, OpeningKey, SealingKey, UnboundKey, AES_256_GCM,
};
use wasm_bindgen::prelude::*;

struct WallNonceSequence(Option<Nonce>);

impl WallNonceSequence {
	fn new(nonce: Nonce) -> Self {
		Self(Some(nonce))
	}
}

impl NonceSequence for WallNonceSequence {
	fn advance(&mut self) -> Result<Nonce, ring::error::Unspecified> {
		self.0.take().ok_or(ring::error::Unspecified)
	}
}

fn make_key<K: BoundKey<WallNonceSequence>>(
	algorithm: &'static Algorithm,
	key: &[u8],
	nonce: Nonce,
) -> K {
	let key = UnboundKey::new(algorithm, key).unwrap();
	let nonce_sequence = WallNonceSequence::new(nonce);
	K::new(key, nonce_sequence)
}

fn seal_with_key(
	algorithm: &'static Algorithm,
	key: &[u8],
	nonce: Nonce,
	aad: Aad<&[u8]>,
	in_out: &mut Vec<u8>,
) -> Result<(), ring::error::Unspecified> {
	let mut s_key: SealingKey<WallNonceSequence> = make_key(algorithm, key, nonce);
	s_key.seal_in_place_append_tag(aad, in_out)
}

fn open_with_key<'a>(
	algorithm: &'static Algorithm,
	key: &[u8],
	nonce: Nonce,
	aad: Aad<&[u8]>,
	in_out: &'a mut [u8],
	ciphertext_and_tag: std::ops::RangeFrom<usize>,
) -> Result<&'a mut [u8], ring::error::Unspecified> {
	let mut o_key: OpeningKey<WallNonceSequence> = make_key(algorithm, key, nonce);
	o_key.open_within(aad, in_out, ciphertext_and_tag)
}

#[wasm_bindgen]
pub fn aes_encrypt(key: &str, iv: &str, data: &str) -> Option<String> {
	let key_bytes = general_purpose::STANDARD
		.decode(key)
		.expect("Invalid key format");
	let iv_bytes = general_purpose::STANDARD
		.decode(iv)
		.expect("Invalid IV format");
	let mut data_bytes = data.as_bytes().to_owned();
	let nonce = Nonce::try_assume_unique_for_key(&iv_bytes).expect("Invalid IV length");

	seal_with_key(
		&AES_256_GCM,
		&key_bytes,
		nonce,
		Aad::from(&[0; 0]),
		&mut data_bytes,
	)
	.expect("Could not encrypt value");

	Some(general_purpose::STANDARD.encode(data_bytes))
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
	a + b
}
