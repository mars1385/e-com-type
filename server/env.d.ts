declare namespace NodeJS {
  export interface ProcessEnv {
    COOKIE_NAME: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    NODE_ENV: string;
    IMAGE_UPLOAD_SIZE: number;
    FILE_UPLOAD_PATH: string;
  }
}
