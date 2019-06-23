<template>
  <div id="app">
    <div>
        <Button @click="type='simple'">简单版本</Button>
        <Button @click="type='encapsulation'">封装版本</Button>
    </div>
    <div class="view-wrap">
        <simple v-if="type === 'simple'"></simple>
        <encapsulation v-if="type === 'encapsulation'"></encapsulation>
    </div>
  </div>
</template>
<script>
import simple from './components/simple'
import encapsulation from './components/encapsulation'

export default {
    mixins: [],
    components: { 
        simple,
        encapsulation
    },
    data() {
        return {
            type: 'simple'
        };
    },
    computed: {},
    mounted() {
    },
    watch: {},
    methods: {}
};
</script>

<style>

</style>
