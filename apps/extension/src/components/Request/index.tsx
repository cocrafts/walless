import { View, Image, Text, TouchableOpacity } from '@walless/ui';
import { FC } from 'react';
import styles from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { requestType } from 'utils/config';
interface RequestProps {
  type: string;
  rules?: RuleProps[];
  buttonPrimaryContent: string;
}
interface RuleProps {
  icon: string;
  description: string;
}
const Request: FC<RequestProps> = ({ type, rules, buttonPrimaryContent }) => {
  return (
    <View className="request__container w-screen h-screen">
      <View className="request__header h-[42px] relative">
        <Image
          className="w-[42px] h-[20px] absolute z-10 left-[14px] top-[11px]"
          style={styles.selectContainer}
          source={{ uri: '/favicon.png' }}
        />
        <View className="select__container absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center flex-row gap-2">
          <Text className="font-normal text-[10px] text-[#ffffff]">
            Zbz thich...
          </Text>
          <Image
            className="w-[6px] h-[3px]"
            source={{ uri: '/img/request-screen/open_rectangle.png' }}
          />
        </View>
      </View>
      <View className="bg-[#2A4C63] rotate-[0.07deg] w-[95%] h-[1px] mx-auto"></View>
      <View className="request__body">
        <Text className="request__title py-4 mx-auto font-normal weight-[500px] text-[20px]">
          {type}
        </Text>
        <Image
          source={{ uri: '/img/request-screen/app_logo.png' }}
          className="mx-auto w-[5rem] h-[5rem] rounded-[10px] pb-[10px]"
        />
        <View className="request__focus pb-[12px]">
          <Text className="request__primary mx-auto font-normal weight-[500] text-[18px]">
            Under Realm
          </Text>
          <Text
            style={{ color: '#587A90' }}
            className="mx-auto request__description pt-1 weight-[400] text-[#587A90] text-[10px]"
          >
            underrealm.stormgate.io
          </Text>
        </View>

        {type == requestType.connectionRequest ? (
          <View className="request__rule mx-[23px] bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[8px] py-[5px] mb-[40px]">
            <Text
              style={{ color: '#587A90' }}
              className="px-[20px] text-center pb-[10px] request__rule-header weight-[400] text-[12px]"
            >
              Under Realm would like to connect with your Walless account to:
            </Text>
            <View className="mb-[10px] bg-[#2A4C63] rotate-[0.07deg] w-full h-[1px] mx-auto "></View>
            {rules?.map((item, index) => {
              return (
                <View className="mb-[5px] request__rule-list flex flex-row gap-2 items-center">
                  <Image
                    className="w-[14px] h-[14px]"
                    source={{ uri: item.icon }}
                  />
                  <Text className="weight-[400] text-[14px]">
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : type == requestType.signatureRequest ? (
          <View className="request__rule mx-[23px] bg-[#01131F] rounded-[8px] border border-solid border-[#01131F] px-[19px] py-[10px] mb-[40px]">
            <Text
              style={{ color: '#587A90' }}
              className="px-[20px] text-center pb-[10px] request__rule-header weight-[400] text-[12px]"
            >
              Your signature has been requested
            </Text>
            {rules?.map((item, index) => {
              return (
                <View className="mb-[5px] request__rule-list flex flex-row gap-2 items-center">
                  <Image
                    className="w-[14px] h-[14px]"
                    source={{ uri: item.icon }}
                  />
                  <Text className="weight-[400] text-[14px]">
                    {item.description}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <></>
        )}
        <Text
          style={{ color: '#587A90' }}
          className="request__notification-message mx-auto mb-[10px] weight-[400px] text-[12px]"
        >
          Only connect to websites you trust!
        </Text>
        <View className="request__notification-box bg-[#88c3bf1a] flex flex-row px-[12px] py-[12px] mx-[20px] items-center gap-2 mb-[13px]">
          <Image
            className="w-[18px] h-[18px]"
            source={{ uri: '/img/request-screen/exclamation_image.png' }}
          />
          <Text
            style={{ color: '#587A90' }}
            className="weight-[400px] text-[10px]"
          >
            This action does not make any fund transfer. This site cannot
            transfer fund without your permission
          </Text>
        </View>
        <LinearGradient
          className="request__button--primary"
          colors={['#8FC5BE', '#1BA0DA']}
          style={{
            flex: 1,
            width: '90%',
            margin: 'auto',
            minHeight: 40,
            borderRadius: 8,
            marginBottom: '10px',
          }}
        >
          <TouchableOpacity style={{}} className="" onPress={() => {}}>
            <Text style={{ textAlign: 'center', lineHeight: 40 }}>
              {buttonPrimaryContent}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          style={{
            width: '80%',
            minHeight: 15,
            margin: 'auto',
            borderRadius: 8,
            backgroundColor: 'black',
          }}
        >
          <Text
            style={{ textAlign: 'center', lineHeight: 15, color: '#88c3c0' }}
          >
            Deny
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Request;
