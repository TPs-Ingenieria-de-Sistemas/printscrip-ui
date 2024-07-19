import { defineConfig, loadEnv } from 'vite';
import 'dotenv/config'


export default ({ mode } : any) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    console.log("process.env in config");
    console.log(process.env);
    
    const conf = defineConfig({
        define: {
            'process.env': {
                VITE_FRONTEND_URL: JSON.stringify(process.env.VITE_FRONTEND_URL),
                VITE_BACKEND_URL: JSON.stringify(process.env.VITE_BACKEND_URL),
                VITE_AUTH0_USERNAME: process.env.VITE_AUTH0_USERNAME,
                VITE_AUTH0_PASSWORD: process.env.VITE_AUTH0_PASSWORD,
            },
        },
        // other configurations
    });

    console.log("process.env in config");
    console.log(process.env);
    
    return conf
};