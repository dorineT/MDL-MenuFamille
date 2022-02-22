<template>

    <div style="margin: 30px">

        <div class= "créationMenu">
            <h3> Période :</h3>
            <constraintscalendar />
        </div>
    </div>
</template>

<script>

import constraintscalendar from '../components/constraintscalendar'
import Constraintscalendar from '../components/constraintscalendar.vue'

export default {
    name: 'CreationMenu',

    components: {
        constraintscalendar,
    }

        
    }
        Constraintscalendar

</script>
