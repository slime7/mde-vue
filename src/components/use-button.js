import { computed, inject } from 'vue';
import { MAT_BTN_GROUP_KEY, MAT_SPLIT_BTN_KEY } from './button-context';
import useComponentColor from './use-component-color';

/**
 * 合并独立按钮、按钮组和 split button 提供的公共状态。
 *
 * @param {object} props
 * @param {(event: 'click', payload: MouseEvent) => void} emit
 * @returns {object}
 */
export default function useButton(props, emit) {
  const group = inject(MAT_BTN_GROUP_KEY, null);
  const split = inject(MAT_SPLIT_BTN_KEY, null);
  const effectiveSize = computed(() => split?.size.value ?? props.size ?? group?.size.value ?? 's');
  const effectiveShape = computed(() => (
    split ? 'round' : props.shape ?? group?.shape.value ?? 'round'
  ));
  const effectiveVariant = computed(() => split?.variant.value ?? props.variant);
  const effectiveColor = computed(() => split?.color.value ?? props.color ?? group?.color.value);
  const effectiveDisabled = computed(() => (
    props.disabled || Boolean(split?.disabled.value) || Boolean(group?.disabled.value)
  ));
  const groupSelects = computed(() => Boolean(group && group.selection.value !== 'none'));
  const effectiveSelected = computed(() => {
    if (split?.role === 'trailing') {
      return split.expanded.value;
    }

    if (groupSelects.value) {
      return group.isSelected(props.value);
    }

    return props.selected;
  });
  const effectiveToggle = computed(() => (
    split?.role === 'trailing' || groupSelects.value || props.toggle
  ));
  const { colorStyle, hasExplicitColor } = useComponentColor(effectiveColor);

  /**
   * @param {MouseEvent} event
   */
  function handleClick(event) {
    if (groupSelects.value) {
      group.requestSelection(props.value, event);
    }

    emit('click', event);
  }

  return {
    colorStyle,
    effectiveColor,
    effectiveDisabled,
    effectiveSelected,
    effectiveShape,
    effectiveSize,
    effectiveToggle,
    effectiveVariant,
    group,
    handleClick,
    hasExplicitColor,
    split,
  };
}
