<template>
  <div class="min-h-screen bg-noise text-green-600">
    <Header />

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.bg-noise {
  background-image: url('assets/images/noise-green.jpg');
}
</style>
