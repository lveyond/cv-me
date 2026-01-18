<template>
  <div class="orders-page">
    <div class="page-header">
      <h1 class="page-title">{{ t('orders.title') }}</h1>
      <div class="page-actions">
        <select v-model="filterStatus" class="input" style="width: 150px;">
          <option value="all">{{ t('orders.allStatus') }}</option>
          <option value="pending">{{ t('orders.statusPending') }}</option>
          <option value="partial">{{ t('orders.statusPartial') }}</option>
          <option value="filled">{{ t('orders.statusFilled') }}</option>
          <option value="cancelled">{{ t('orders.statusCancelled') }}</option>
        </select>
        <select v-model="filterPair" class="input" style="width: 150px;">
          <option value="all">{{ t('orders.allPairs') }}</option>
          <option value="ETH/USDT">ETH/USDT</option>
          <option value="BTC/USDT">BTC/USDT</option>
          <option value="SOL/USDT">SOL/USDT</option>
        </select>
        <button class="btn">{{ t('orders.export') }}</button>
      </div>
    </div>

    <div class="orders-content">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('orders.time') }}</th>
              <th>{{ t('orders.tradingPair') }}</th>
              <th>{{ t('orders.type') }}</th>
              <th>{{ t('orders.direction') }}</th>
              <th>{{ t('orders.price') }}</th>
              <th>{{ t('orders.amount') }}</th>
              <th>{{ t('orders.filled') }}</th>
              <th>{{ t('orders.status') }}</th>
              <th>{{ t('orders.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="mono">{{ order.time }}</td>
              <td>
                <div class="pair-info">
                  <img 
                    :src="getPairIcon(order.pair)" 
                    :alt="order.pair"
                    class="pair-icon"
                    @error="handleImageError"
                  />
                  <span>{{ order.pair }}</span>
                </div>
              </td>
              <td>
                <span class="badge">{{ getOrderTypeText(order.type) }}</span>
              </td>
              <td>
                <span :class="order.side === 'buy' ? 'text-success' : 'text-danger'">
                  {{ order.side === 'buy' ? t('orders.buy') : t('orders.sell') }}
                </span>
              </td>
              <td class="mono">${{ order.price }}</td>
              <td class="mono">{{ order.amount }}</td>
              <td class="mono">{{ order.filled }}</td>
              <td>
                <span :class="getStatusClass(order.status)">{{ getStatusText(order.status) }}</span>
              </td>
              <td>
                <button 
                  v-if="order.status === statusMap.pending || order.status === statusMap.partial"
                  class="btn btn-cancel"
                  @click="cancelOrder(order.id)"
                >
                  {{ t('orders.cancel') }}
                </button>
                <span v-else class="text-muted mono">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button class="btn" :disabled="currentPage === 1" @click="currentPage--">{{ t('orders.prevPage') }}</button>
        <span class="pagination-info mono">
          {{ getPageInfo() }}
        </span>
        <button class="btn" :disabled="currentPage === totalPages" @click="currentPage++">{{ t('orders.nextPage') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentLanguage, t as translate } from '../i18n'

const router = useRouter()
const currentLanguage = inject('language', ref(getCurrentLanguage()))

// 监听语言变化
const handleLanguageChange = () => {
  currentLanguage.value = getCurrentLanguage()
}

onMounted(() => {
  window.addEventListener('language-changed', handleLanguageChange)
})

onUnmounted(() => {
  window.removeEventListener('language-changed', handleLanguageChange)
})

const t = (key) => {
  return translate(key, currentLanguage.value)
}

const getPageInfo = () => {
  const template = t('orders.pageInfo')
  return template.replace('{current}', currentPage.value).replace('{total}', totalPages.value)
}

const filterStatus = ref('all')
const filterPair = ref('all')
const currentPage = ref(1)
const pageSize = 20

// 状态映射（使用内部标识，显示时翻译）
const statusMap = {
  pending: 'pending',
  partial: 'partial',
  filled: 'filled',
  cancelled: 'cancelled'
}

// 订单数据（使用内部状态标识）
const orders = ref([
  { id: 1, time: '2024-01-15 14:32:15', pair: 'ETH/USDT', type: 'limit', side: 'buy', price: '2750.00', amount: '1.0', filled: '0.0', status: 'pending' },
  { id: 2, time: '2024-01-15 14:28:42', pair: 'ETH/USDT', type: 'limit', side: 'sell', price: '2760.00', amount: '0.5', filled: '0.2', status: 'partial' },
  { id: 3, time: '2024-01-15 14:25:18', pair: 'BTC/USDT', type: 'limit', side: 'buy', price: '42850.00', amount: '0.1', filled: '0.1', status: 'filled' },
  { id: 4, time: '2024-01-15 14:20:05', pair: 'SOL/USDT', type: 'market', side: 'buy', price: '98.45', amount: '50', filled: '50', status: 'filled' },
  { id: 5, time: '2024-01-15 14:15:33', pair: 'ETH/USDT', type: 'limit', side: 'sell', price: '2755.00', amount: '2.0', filled: '0.0', status: 'cancelled' },
  { id: 6, time: '2024-01-15 14:10:22', pair: 'BTC/USDT', type: 'limit', side: 'buy', price: '42800.00', amount: '0.05', filled: '0.05', status: 'filled' },
  { id: 7, time: '2024-01-15 14:05:11', pair: 'ETH/USDT', type: 'limit', side: 'sell', price: '2765.00', amount: '1.5', filled: '0.0', status: 'pending' },
  { id: 8, time: '2024-01-15 14:00:05', pair: 'SOL/USDT', type: 'market', side: 'sell', price: '98.20', amount: '30', filled: '30', status: 'filled' }
])

const filteredOrders = computed(() => {
  let result = orders.value

  if (filterStatus.value !== 'all') {
    result = result.filter(order => order.status === filterStatus.value)
  }

  if (filterPair.value !== 'all') {
    result = result.filter(order => order.pair === filterPair.value)
  }

  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return result.slice(start, end)
})

const totalPages = computed(() => {
  let count = orders.value.length
  if (filterStatus.value !== 'all') {
    count = orders.value.filter(order => order.status === filterStatus.value).length
  }
  if (filterPair.value !== 'all') {
    count = orders.value.filter(order => order.pair === filterPair.value).length
  }
  return Math.ceil(count / pageSize)
})

const getStatusClass = (status) => {
  const classes = {
    'pending': 'badge badge-warning',
    'partial': 'badge badge-warning',
    'filled': 'badge badge-success',
    'cancelled': 'badge'
  }
  return classes[status] || 'badge'
}

const getStatusText = (status) => {
  const statusTextMap = {
    'pending': 'orders.statusPending',
    'partial': 'orders.statusPartial',
    'filled': 'orders.statusFilled',
    'cancelled': 'orders.statusCancelled'
  }
  return t(statusTextMap[status] || 'orders.statusPending')
}

const getOrderTypeText = (type) => {
  const typeMap = {
    'limit': 'orders.limitOrder',
    'market': 'orders.marketOrder'
  }
  return t(typeMap[type] || 'orders.limitOrder')
}

const cancelOrder = (orderId) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'cancelled'
  }
}

// 获取交易对图标（取第一个币种的图标）
const getPairIcon = (pair) => {
  const symbol = pair.split('/')[0]
  return getAssetIcon(symbol)
}

// 获取币种图标URL
const getAssetIcon = (symbol) => {
  const iconMap = {
    'ETH': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    'BTC': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    'USDT': 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    'USDC': 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    'SOL': 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    'MATIC': 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
  }
  return iconMap[symbol] || `https://assets.coingecko.com/coins/images/1/small/bitcoin.png`
}

// 处理图标加载错误
const handleImageError = (event) => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.orders-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.orders-content {
  background: rgba(22, 27, 34, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.table-container {
  overflow-x: auto;
  margin-bottom: var(--spacing-lg);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-info {
  font-size: 12px;
  color: var(--text-muted);
}

.btn-cancel {
  width: auto;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 11px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-secondary);
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.25);
  color: var(--text-primary);
  transform: none;
}

.pair-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.pair-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
