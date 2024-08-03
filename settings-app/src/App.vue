<script setup lang="ts">
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  GeneralComponent,
  NotificationsComponent,
  PrivacyComponent,
  Toaster,
} from '@/components';
import { ref } from 'vue';
const activeTab = ref<'general' | 'notifications' | 'privacy'>('general');
</script>

<template>
  <main class="container mt-16">
    <Tabs v-model="activeTab">
      <TabsList class="w-full grid grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent :forceMount="true" value="general">
        <KeepAlive>
          <GeneralComponent />
        </KeepAlive>
      </TabsContent>
      <TabsContent :forceMount="true" value="privacy">
        <PrivacyComponent />
      </TabsContent>
      <TabsContent :forceMount="true" value="notifications">
        <NotificationsComponent />
      </TabsContent>
    </Tabs>
  </main>
  <Toaster :position="'top-center'" richColors closeButton expand />
</template>
