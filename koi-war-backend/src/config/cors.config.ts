const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081',  'https://koiwar.site', ];
export const corsOptions = {
    origin: function (origin : any, callback: any) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
