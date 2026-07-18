<!-- #region script -->
<script setup>
import { ref } from 'vue';

const connectedIconSelected = ref('two');
const connectedLabelSelected = ref('two');
const connectedMixedSelected = ref('two');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <section class="example-section">
      <p class="example-label">
        standard
      </p>

      <mat-btn-group>
        <mat-btn icon="bluetooth" label="蓝牙" />
        <mat-btn icon="alarm" label="闹钟" />
        <mat-btn icon="link" label="链接" />
        <mat-btn icon="wifi" label="无线网络" />
      </mat-btn-group>

      <mat-btn-group>
        <mat-btn variant="filled-tonal">
          Label
        </mat-btn>
        <mat-btn prefix="edit">
          Label
        </mat-btn>
        <mat-btn variant="filled-tonal">
          Label
        </mat-btn>
        <mat-btn variant="filled-tonal" icon="delete" label="删除" />
      </mat-btn-group>

      <mat-btn-group>
        <mat-btn variant="filled-tonal" icon="star" label="收藏一" />
        <mat-btn variant="filled-tonal" icon="star" label="收藏二" />
        <mat-btn prefix="star" toggle selected>
          Label
        </mat-btn>
        <mat-btn variant="filled-tonal" icon="star" label="收藏四" />
        <mat-btn variant="filled-tonal" icon="star" label="收藏五" />
      </mat-btn-group>
    </section>

    <section class="example-section">
      <p class="example-label">
        connected
      </p>

      <mat-btn-group
        variant="connected"
        selection="single"
        :selected="connectedIconSelected"
        @select="connectedIconSelected = $event.nextSelected"
      >
        <mat-btn icon="star" label="收藏一" value="one" />
        <mat-btn icon="star" label="收藏二" value="two" />
        <mat-btn icon="star" label="收藏三" value="three" />
        <mat-btn icon="star" label="收藏四" value="four" />
        <mat-btn icon="star" label="收藏五" value="five" />
      </mat-btn-group>

      <mat-btn-group
        variant="connected"
        selection="single"
        :selected="connectedLabelSelected"
        @select="connectedLabelSelected = $event.nextSelected"
      >
        <mat-btn prefix="star" value="one">
          Label
        </mat-btn>
        <mat-btn prefix="star" value="two">
          Label
        </mat-btn>
        <mat-btn prefix="star" value="three">
          Label
        </mat-btn>
      </mat-btn-group>

      <mat-btn-group
        variant="connected"
        selection="single"
        :selected="connectedMixedSelected"
        @select="connectedMixedSelected = $event.nextSelected"
      >
        <mat-btn icon="star" label="收藏一" value="one" />
        <mat-btn prefix="star" value="two">
          Label
        </mat-btn>
        <mat-btn icon="star" label="收藏三" value="three" />
      </mat-btn-group>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.example-label {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-weight: 600;
}
</style>
<!-- #endregion style -->
