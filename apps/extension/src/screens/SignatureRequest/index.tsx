import Request from 'components/Request';
import { requestType } from 'utils/config';

export const signatiure = () => {
  return (
    <Request
      type={requestType.signatureRequest}
      buttonPrimaryContent="Sign and Approve"
    />
  );
};
