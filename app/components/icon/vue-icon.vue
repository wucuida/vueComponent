<template>
<i :class="iconClasses">
  <slot></slot>
</i>
</template>

<script>
import { defaultProps } from '../../util/util'
export default {
  props: defaultProps({
    className: '',
    type: {
      type: String,
      require: true
    }
  }),
  computed: {
    iconClasses () {
      return {
        [this.className]: !!this.className,
        [`anticon`]: 1,
        [`anticon-${this.type}`]: this.type
      }
    }
  }
}
</script>