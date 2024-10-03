
export const corsConfig = {
    origin: function(origin, callback){
        const whiteList = [process.env.FRONTEND_URL, 'https://localhost:3000/docs' ]

        if(whiteList.includes(origin)){
            callback(null, true)
        }
        else{
            callback(new Error('Error de CORS'))
        }
    }
}