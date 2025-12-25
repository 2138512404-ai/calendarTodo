<template>
  <div class="calendar-container">
    <el-calendar v-model="selectedDate">
      <template #date-cell="{ data }">
        <div class="calendar-cell" @click="handleDateClick(data)">
          <span class="calendar-date">{{ data.day.split('-').pop() }}</span>
          <div class="todo-marker" :class="getMarkerClass(data.day)"></div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

const router = useRouter()
const selectedDate = ref<Date>(new Date())

const getTodosFromStorage = (): TodoItem[] => {
  try {
    const raw = localStorage.getItem('todoList')
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('读取待办数据失败', e)
    return []
  }
}

const todoDateStatus = computed(() => {
  const allTodos = getTodosFromStorage()
  const statusMap: Record<string, 'unfinished' | 'finished' | 'none'> = {}

  const dateGroup = allTodos.reduce((group, todo) => {
    if (!group[todo.date]) group[todo.date] = []
    group[todo.date].push(todo)
    return group
  }, {} as Record<string, TodoItem[]>)

  Object.keys(dateGroup).forEach(date => {
    const todos = dateGroup[date]
    const allCompleted = todos.every(todo => todo.completed)
    statusMap[date] = allCompleted ? 'finished' : 'unfinished'
  })
  return statusMap
})

const getMarkerClass = (date: string) => {
  const formattedDate = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date(date)).replace(/\//g, '-')
  
  const status = todoDateStatus.value[formattedDate]
  if (status === 'unfinished') return 'marker-red' 
  if (status === 'finished') return 'marker-green' 
  return ''
}

const handleDateClick = (data: any) => {
  if (data.disabled) return
  
  const formatted = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date(data.day)).replace(/\//g, '-')
  
  router.push({ path: '/event', query: { date: formatted } })
}

onMounted(() => {
  window.addEventListener('storage', () => {
    todoDateStatus.value = { ...todoDateStatus.value }
  })
})
</script>

<style scoped>
.calendar-container {
  max-width: 1400px;
  width: 100%;
  margin: 20px auto;
  padding: 30px;
  box-sizing: border-box;
  background: transparent !important;
}

.calendar-cell {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  cursor: pointer; 
  transition: background 0.2s; 
}
.calendar-cell:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px;
}

.calendar-date {
  font-size: 16px;
  font-weight: 500;
}

.todo-marker {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 4px;
  display: none;
}

.todo-marker.marker-red {
  display: block;
  background-color: #f56c6c; 
}

.todo-marker.marker-green {
  display: block;
  background-color: #21b533; 
}

:deep(.el-calendar-table td) {
  height: 80px; 
}

:deep(.el-calendar-table th) {
  padding: 12px 0;
  font-weight: 600;
  color: #ffffff !important;
}

:deep(.el-calendar) {
  background: transparent !important;
  border: none !important;
}

:deep(.el-calendar-table td) {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important; 
}


:deep(.el-calendar-table__row td.is-today .calendar-date) {
  color: #78adf8 !important;
  font-weight: 800 !important;
  font-size: 20px !important;
}
</style>