<script setup>
import { onMounted } from 'vue'

// Only execute redirect on client-side
if (!import.meta.env.SSR) {
  onMounted(() => {
    window.location?.replace('/');
  })
}
</script>
