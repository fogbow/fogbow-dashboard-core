import { floatIpsActionsTypes } from './floatIps.actions.types';
import FloatIPsProvider from '../providers/float.ips.provider';

export const createFloatIp = (body) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = () => ({ type: floatIpsActionsTypes.CREATE_FLOAT_IP_REQUEST});
            const success = (floatIp) => ({ type: floatIpsActionsTypes.CREATE_FLOAT_IP_SUCCESS, floatIp });
            const failure = (error) => ({ type: floatIpsActionsTypes.CREATE_FLOAT_IP_FAILURE, error });

            dispatch(request());

            FloatIPsProvider.create(body).then(
                floatIp => resolve(dispatch(success(floatIp.data)))
            ).catch(
                error => reject(dispatch(failure(error)))
            );
        });
    };
};

export const getFloatIps = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = () => ({ type: floatIpsActionsTypes.GET_FLOAT_IPS_REQUEST});
            const success = (floatIps) => ({ type: floatIpsActionsTypes.GET_FLOAT_IPS_SUCCESS, floatIps });
            const failure = (error) => ({ type: floatIpsActionsTypes.GET_FLOAT_IPS_FAILURE, error });

            dispatch(request());

            FloatIPsProvider.get().then(
                floatIps => resolve(dispatch(success(floatIps.data)))
            ).catch(
                error => reject(dispatch(failure(error)))
            );
        });
    };
};