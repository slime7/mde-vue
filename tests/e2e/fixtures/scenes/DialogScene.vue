<script setup>
import { ref } from 'vue';
import { confirm } from 'mde-vue';

const open = ref(false);

function record(name, payload = null) {
  window.pushEvent(name, payload);
}

function close(result) {
  open.value = false;
  record(result);
}

async function runConfirm() {
  const result = await confirm({
    title: '命令式确认',
    content: '命令式正文',
  });
  record('confirm-result', result);
}
</script>

<template>
  <section data-scene="dialog" class="dialog-scene">
    <div class="fixed-actions">
      <mat-dialog
        v-model="open"
        close-on-back
        title="确认操作"
        @closed="record('dialog-closed')"
      >
        <template #activator>
          <mat-btn
            data-testid="open-dialog"
            @click="open = true"
          >
            打开对话框
          </mat-btn>
        </template>
        <p>对话框正文内容</p>
        <mat-btn
          data-testid="dialog-cancel"
          @click="close('dialog-cancel')"
        >
          取消
        </mat-btn>
        <mat-btn
          data-testid="dialog-confirm"
          @click="close('dialog-confirm')"
        >
          确认
        </mat-btn>
      </mat-dialog>

      <mat-btn
        data-testid="open-imperative"
        @click="runConfirm"
      >
        命令式确认
      </mat-btn>
    </div>

    <div class="tall">
      <p>页面滚动占位</p>
    </div>
  </section>
</template>

<style scoped>
.dialog-scene {
  min-block-size: 300vh;
}

.fixed-actions {
  position: fixed;
  inset-block-start: 12px;
  inset-inline-start: 12px;
  display: flex;
  gap: 8px;
}

.tall {
  block-size: 280vh;
}
</style>
