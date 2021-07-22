<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="wait check message" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

