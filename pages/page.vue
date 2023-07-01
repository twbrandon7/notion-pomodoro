<template>
    <div>
        <h1>Notion Pages</h1>
        <div v-if="!error">
            <div>
                {{ JSON.stringify(page) }}
            </div>
        </div>
        <p v-else>{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";

export default {
    async asyncData({ app }: Context) {
        try {
            const page = await app.$notion.listDatabaseInPage();

            return {
                page,
                error: undefined,
            };
        } catch (error) {
            console.error(error);

            return {
                error: "Failed to fetch data from Notion.",
            };
        }
    },
};
</script>