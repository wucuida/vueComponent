<template lang="html">

<div :class="['ant-btn-group', `ant-btn-group${size}`]" >
    <slot></slot>
</div>

</template>

<script>
import cx from 'classnames'

export default {
    data:()=>({
        prefix: 'ant-btn-group',
    }),
    props: {
        size: {
            coerce(val) {
                if(val === 'small')
                    return '-sm'
                if(val === 'large')
                    return '-lg'
                return ''
            }
        } 
    },
}
</script>

<style lang="css">
</style>
