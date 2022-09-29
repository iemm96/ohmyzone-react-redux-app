import axios, {AxiosRequestConfig} from "axios";
import {Buffer} from 'buffer';
export const fetchFile = async (resource:string) => {

    const options:AxiosRequestConfig<any> = {
        url: resource,
        method: 'GET',
        responseType: 'arraybuffer',
    };

    try {
        const response = await axios(options);

        if(response) {
            const buffer:any = Buffer.from(response.data, 'binary');
            let dataBlob:Blob = new Blob([ buffer ]);
            let metadata = {
                type: response.headers["content-type"]
              };

              const extension:any = response.headers["content-type"].split('/');

              return new File([ dataBlob ], `backgroundImage.${ extension[1] }`, metadata);
        }

    }catch (error) {
        return {
            success: false,
            error
        }
    }

};