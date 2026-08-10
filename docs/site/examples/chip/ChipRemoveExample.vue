<!-- #region template -->
<template>
  <div class="remove-example">
    <mat-chip-set aria-label="联系人">
      <mat-chip
        v-for="contact in contacts"
        :key="contact"
        variant="input"
        @remove="removeContact(contact)"
      >
        {{ contact }}
      </mat-chip>
    </mat-chip-set>

    <span>{{ status }}</span>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { computed, ref } from 'vue';

const contacts = ref(['张三', '李四', '王五']);
const status = computed(() => (
  contacts.value.length > 0
    ? `当前联系人：${contacts.value.join('、')}`
    : '联系人已清空'
));

function removeContact(contact) {
  contacts.value = contacts.value.filter((item) => item !== contact);
}
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.remove-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
