import { Client } from "@notionhq/client";
import { Plugin } from "@nuxt/types";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionPlugin: Plugin = ({ app }, inject: (key: string, value: any) => void) => {
  inject("notion", notion);
};

export default notionPlugin;