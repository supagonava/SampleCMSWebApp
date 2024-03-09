declare module "*.gif";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.json";
declare module "*.png";
declare module "*.svg";
declare module "*.ts";
declare module "*.tsx";

// env.d.ts
interface ImportMeta {
    env: {
        [key: string]: string;
    };
}
