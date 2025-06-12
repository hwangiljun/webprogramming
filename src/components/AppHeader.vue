<template>
  <header class="p-4 md:p-6 border-b bg-white sticky top-0 z-50">
    <nav class="flex items-center justify-between max-w-7xl mx-auto">
      <div class="flex items-center space-x-8">
        <h1  @click="$router.push('/')" class="text-xl md:text-2xl font-bold text-gray-800" style="cursor: pointer;">Korea Tourism</h1>
        <ul class="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <li><a href="#" class="hover:text-blue-600 transition-colors">recommend</a></li>
          <li><a href="#" class="hover:text-blue-600 transition-colors">list</a></li>
          <li><a href="#" class="hover:text-blue-600 transition-colors">travel Detail</a></li>
        </ul>
      </div>
      <!-- 버튼 그룹을 flex로 감싸기 -->
      <div class="flex items-center space-x-2">
        <button
          @click="$router.push('/signup')"
          class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Sign up
        </button>
        <button
          @click="$router.push('/login')"
          class="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Login
        </button>
      </div>
    </nav>
  </header>
</template>


<script>
export default {
  name: 'AppHeader'
}
</script>