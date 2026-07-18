<!-- #region script -->
<script setup>
import { ref } from 'vue';

const roundSelected = ref('two');
const squareSelected = ref('two');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <div class="example-shape">
      <mat-btn-group shape="round">
        <mat-btn
          icon="edit"
          label="编辑一"
          toggle
          :selected="roundSelected === 'one'"
          @click="roundSelected = 'one'"
        />
        <mat-btn
          icon="edit"
          label="编辑二"
          toggle
          :selected="roundSelected === 'two'"
          @click="roundSelected = 'two'"
        />
        <mat-btn
          icon="edit"
          label="编辑三"
          toggle
          :selected="roundSelected === 'three'"
          @click="roundSelected = 'three'"
        />
        <mat-btn
          icon="edit"
          label="编辑四"
          toggle
          :selected="roundSelected === 'four'"
          @click="roundSelected = 'four'"
        />
      </mat-btn-group>

      <mat-btn-group shape="round">
        <mat-btn
          prefix="edit"
          toggle
          :selected="roundSelected === 'one'"
          @click="roundSelected = 'one'"
        >
          Label
        </mat-btn>
        <mat-btn
          prefix="edit"
          toggle
          :selected="roundSelected === 'two'"
          @click="roundSelected = 'two'"
        >
          Label
        </mat-btn>
        <mat-btn
          prefix="edit"
          toggle
          :selected="roundSelected === 'three'"
          @click="roundSelected = 'three'"
        >
          Label
        </mat-btn>
      </mat-btn-group>
    </div>

    <div class="example-shape">
      <mat-btn-group shape="square">
        <mat-btn
          icon="edit"
          label="编辑一"
          toggle
          :selected="squareSelected === 'one'"
          @click="squareSelected = 'one'"
        />
        <mat-btn
          icon="edit"
          label="编辑二"
          toggle
          :selected="squareSelected === 'two'"
          @click="squareSelected = 'two'"
        />
        <mat-btn
          icon="edit"
          label="编辑三"
          toggle
          :selected="squareSelected === 'three'"
          @click="squareSelected = 'three'"
        />
        <mat-btn
          icon="edit"
          label="编辑四"
          toggle
          :selected="squareSelected === 'four'"
          @click="squareSelected = 'four'"
        />
      </mat-btn-group>

      <mat-btn-group shape="square">
        <mat-btn
          prefix="edit"
          toggle
          :selected="squareSelected === 'one'"
          @click="squareSelected = 'one'"
        >
          Label
        </mat-btn>
        <mat-btn
          prefix="edit"
          toggle
          :selected="squareSelected === 'two'"
          @click="squareSelected = 'two'"
        >
          Label
        </mat-btn>
        <mat-btn
          prefix="edit"
          toggle
          :selected="squareSelected === 'three'"
          @click="squareSelected = 'three'"
        >
          Label
        </mat-btn>
      </mat-btn-group>
    </div>
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

.example-shape {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
</style>
<!-- #endregion style -->
