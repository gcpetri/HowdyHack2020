// weekly page
Vue.component('weekly-page', {
    template: `
        <div class="weekly-page-container">
        <div class="weekly-page">
            <br></br><br></br><br></br>
            <a class="wk-total">WEEK TOTAL</a></br>
            <span class="wk-water"><b>{{ this.$root.weekly_water_consumption }}</b><a class="unit-abbrv" 
            v-show="this.$root.liters">L</a><a class="unit-abbrv" 
            v-show="this.$root.gallons">gal</a></span>
            <div class="cup"></div>
            <div class="legend">
                <ul>
                    <li class="red-legend"><b>Water usage high</b></li>
                    <li class="yellow-legend"><b>Water usage medium</b></li>
                    <li class="green-legend"><b>Water usage</br>low</b></li>
                </ul>
            </div>
        </div>
        </div>
    `,
}),
// daily page
Vue.component('daily-page', {
    template: `
        <div class="daily-page-container">
        <div class="daily-page"><br></br></br></br>
            <div class="daily-page-header">
                <a class="today-title">TODAY'S TOTAL</a></br>
            </div>
            <div class="water-images">
                <div class="shower-image" v-show="this.$root.is_shower"><img class="shower" src="shower_pic.png"></></div>
                <div class="toilet-image" v-show="this.$root.is_toilet"><img class="toilet" src="toilet_pic.png"></></div>
                <div class="bath-image" v-show="this.$root.is_bath"><img class="shower" src="bath_pic.png"></></div>
                <div class="sink-image" v-show="this.$root.is_sink"><img class="toilet" src="sink_pic.png"></></div>
            </div>
            <div class="today-number-div">
                <span class="today-number"><b>{{ this.$root.daily_water_consumption }}</b></span>
                <div class="units-div">
                    <a class="units" @click="change_units('gals')" v-show="this.$root.liters"><b>LITERS</b></a>
                    <a class="units" @click="change_units('lits')" v-show="this.$root.gallons"><b>GALLONS</b></a>
                </div>
            </div>
        </div>
        </div>
    `,
    methods: {
        change_units: function(unit) {
            if (unit == 'gals') {return this.$root.gallons=true,this.$root.liters=false}
            else if (unit == 'lits') {return this.$root.gallons=false,this.$root.liters=true}
    }}
}),
// more page
Vue.component('more-page', {
    template: `
        <div class="more-page-container">
        <div class="more-page">
            <div class="account">
                <a class="my-account"><b>Account</b></a>
            </div> <br></br>
            <div class="bathroom-location">
                <a class="my-location-question">Are you in your bathroom?</a><br></br>
                <a class="my-location-button" @click="save_loc_to_bathroom()"><b>YES!</b></a></br></br>
                <a class="your-loc">Latitude: {{ this.$root.bathroom_location_lat }}</a>
                <a class="your-loc">Longitude: {{ this.$root.bathroom_location_long }}</a>
            </div>
        </div>
        </div>
    `,
    methods: {
        save_loc_to_bathroom: function() {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
                console.log(position.coords.latitude);
                this.$root.bathroom_location_lat = position.coords.latitude;
                this.$root.bathroom_location_long = position.coords.longitude;
            }, error => {
                console.error(error)
            })
        },
}});
// navigation bar
Vue.component('nav-bar', {
    template: `
        <div class='nav-bar'>
            <ul>
                <li @click="nav_func('weekly'); change_cup_func()" v-bind:class="{active: nav_weekly2}"><a href="#weekly"><b>Weekly</b></a></li>
                <li @click="nav_func('daily')" v-bind:class="{active: nav_daily2}"><a href="#daily"><b>Daily</b></a></li>
                <li @click="nav_func('more')" v-bind:class="{active: nav_more2}"><a href="#more"><b>More</b></a></li>
            </ul>
        </div>
    `,
    data: function() {
        return {
            nav_weekly2: false,
            nav_daily2: true,
            nav_more2: false,
        }
    },
    methods: {
        nav_func: function(page) {
            if (page == 'weekly') {return this.$root.nav_weekly=true,this.$root.nav_daily=false,this.$root.nav_more=false,
                                this.nav_weekly2=true,this.nav_daily2=false,this.more2=false}
            else if (page == 'daily') {return this.$root.nav_weekly=false,this.$root.nav_daily=true,this.$root.nav_more=false,
                                this.nav_weekly2=false,this.nav_daily2=true,this.more2=false}
            else if (page == 'more') {return this.$root.nav_weekly=false,this.$root.nav_daily=false,this.$root.nav_more=true,
                                this.nav_weekly2=true,this.nav_daily2=false,this.more2=true}
        },
        change_cup_func: function() {
            console.log(this.$root.weekly_water_consumption);
            var wk = Number(this.$root.weekly_water_consumption);
            console.log(wk);
            if (wk <= 420) {
                document.documentElement.style.setProperty('--main-position-cup', '210px');
            } else if (wk > 420 && wk <= 490) {
                document.documentElement.style.setProperty('--main-position-cup', '300px');
            } else if (wk > 490 && wk <= 560) {
                document.documentElement.style.setProperty('--main-position-cup', '410px');
            } else if (wk > 630 && wk <= 700) {
                document.documentElement.style.setProperty('--main-position-cup', '550px');
            } else if (wk > 770) {
                document.documentElement.style.setProperty('--main-position-cup', '560px');
            }
    }
}});
// main app
var app = new Vue({
    el: '#app',
    data: { 
        nav_weekly: false,
        nav_daily: true,
        nav_more: false,
        bathroom_location_lat: '',
        bathroom_location_long: '',
        daily_water_consumption: '9',
        weekly_water_consumption: '1000',
        is_toilet: false,
        is_bath: false,
        is_sink: false,
        is_shower: true,
        liters: true,
        gallons: false,
    },
});