<template>

    <div style="margin: 30px">

        <div class= "créationMenu">
            <h3> Période :</h3>
            <Constraintscalendar />
        </div>
    </div>
</template>

<script>


import Constraintscalendar from '../components/Constraintscalendar'

export default {
    name: 'CreationMenu',

    components: {
        Constraintscalendar,
    }

        
    }
        Constraintscalendar

</script>
