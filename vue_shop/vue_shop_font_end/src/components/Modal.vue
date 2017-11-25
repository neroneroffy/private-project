<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-close" @click="closeModal">关闭</div>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>

<script>
    export default {
      props:["mdShow"],
      methods:{
        closeModal(){
          this.$emit('close');
        }
      }
    }
</script>
<style>

</style>
