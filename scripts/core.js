const GenericRequestService = {
     request: async ({ url, method = 'GET', headers = {}, body = null, callback, errorCallback }) => {
          try {
               waitMe(true)
               const defaultHeaders = new Headers({
                    'Content-Type': 'application/json',
                    'x-user-token': token,
                    ...headers,
               });

               const fetchOptions = {
                    method: method,
                    headers: defaultHeaders,
               };

               if (body && method !== 'GET') {
                    fetchOptions.body = JSON.stringify(body);
               }

               const response = await fetch(url, fetchOptions);

               /*
               if (!response.ok) {
                    waitMe(false)
                    throw new Error(`Hata: ${response.status} ${response.statusText}`);
               }
                    */


               const data = await response.json();

               if(data.error){
                    throw new Error(data.error);
               }

               if (callback && typeof callback === 'function') {
                    waitMe(false)
                    callback(data);
               }
          } catch (error) {
               console.error('Hata:', error.message);

               if (errorCallback && typeof errorCallback === 'function') {
                    waitMe(false)
                    errorCallback(error.message);
               }
          }
     },
};
