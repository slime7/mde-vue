<!-- #region script -->
<script setup>
import { ref } from 'vue';

const multipleSelected = ref(['two', 'three', 'four']);
const singleSelected = ref('two');
const standardMultipleSelected = ref(['one', 'three']);
const standardSingleSelected = ref('two');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-stack">
    <mat-btn-group
      selection="single"
      :selected="standardSingleSelected"
      @select="standardSingleSelected = $event.nextSelected"
    >
      <mat-btn prefix="star" value="one">
        standard one
      </mat-btn>
      <mat-btn prefix="star" value="two">
        standard two
      </mat-btn>
      <mat-btn prefix="star" value="three">
        standard three
      </mat-btn>
    </mat-btn-group>

    <mat-btn-group
      selection="multiple"
      :selected="standardMultipleSelected"
      @select="standardMultipleSelected = $event.nextSelected"
    >
      <mat-btn prefix="star" value="one">
        standard one
      </mat-btn>
      <mat-btn prefix="star" value="two">
        standard two
      </mat-btn>
      <mat-btn prefix="star" value="three">
        standard three
      </mat-btn>
    </mat-btn-group>

    <mat-btn-group
      variant="connected"
      selection="single"
      :selected="singleSelected"
      @select="singleSelected = $event.nextSelected"
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
      <mat-btn prefix="star" value="four">
        Label
      </mat-btn>
    </mat-btn-group>

    <mat-btn-group
      variant="connected"
      selection="multiple"
      :selected="multipleSelected"
      @select="multipleSelected = $event.nextSelected"
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
      <mat-btn prefix="star" value="four">
        Label
      </mat-btn>
    </mat-btn-group>
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
</style>
<!-- #endregion style -->
