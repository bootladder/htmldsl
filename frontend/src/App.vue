<script>
const cl = console.log
import { html as beautifyHtml } from 'js-beautify';
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';
const dashes="-----------------------------------------------------"
const initTagTable = {
    'd': '<div class="div0">',
    '/d': '</div>',
    'dr': '<div class="row">',
    '/dr': '</div>',
    'dc': '<div class="col">',
    '/dc': '</div>',
    't': 'hello',
    '/t': '',
    'db': '<div class="borderbackground">',
    '/db': '</div>',
}

const initStyleTagText = 
`
<style>
</style>
`


export default {
	setup () {
		return {
            blah: ref('hello world'),
            userinputtext: ref("dc\n-d\n-t\nd"),
            tagTableText: ref(JSON.stringify(initTagTable,null,2) ),
            styleTagText: ref(JSON.stringify(initStyleTagText,null,2) ),
            outputref: ref(null),
		}
	},


    watch: {},

    methods: {
        loadoutputhtml:function(){
            //this.$refs.outputref.innerHTML = this.outputhtmlstring
            this.$refs.outputref.$el.innerHTML = this.outputhtmlstring;
        },
        enterpressed: function(){
            const temp = this.userinputtext.replace(/" "/g,"-")
            this.userinputtext = this.userinputtext.replace(/ /g,"-")
            //this.userinputtext.value = this.userinputtext.value.replace(/ /g, "-");
        },
     },
    computed: { 
        tagTable: function(){
            return JSON.parse(this.tagTableText)
        },
        styleTag: function(){
            return JSON.parse(this.styleTagText)
        },
        siblingdict: function(){
            const NUMDIGITS = 8
            var acc = 0
            return this.userinputtext.split('\n').map( (rawline) => {
                const line = rawline.replace(/-/g," ")
                const indent = line.length - line.trimStart().length
                acc =  acc+Math.pow(10,NUMDIGITS - indent - 1)
                return [acc, indent, line.trimStart()]
            })
        },
        siblingdictplusclosingsorted: function(){
            const NUMDIGITS = 8
            const newdict = JSON.parse(JSON.stringify(this.siblingdict))
            this.siblingdict.forEach( d => {
                const newitem = [d[0] + Math.pow(10,NUMDIGITS-d[1] -2) * 9, d[1],"/"+d[2]]
                newdict.push(newitem)
            })
            //return newdict.sort( (d1,d2) => parseInt(d1[0]) > parseInt(d2[0]))
            return newdict.sort((d1, d2) => d1[0] - d2[0]);

        },
        outputarray: function(){
            return this.siblingdictplusclosingsorted.map(s => dashes.slice(0,s[1]*4) +  this.tagTable[s[2]])
        },

        outputarrayraw: function(){
            return this.siblingdictplusclosingsorted.map(s =>this.tagTable[s[2]])
        },
        outputhtmlstring: function(){
            return this.outputarrayraw.join("")
        },
        outputhtmlstringwithstyletag: function(){
            return '<div>' + this.styleTagText +  this.outputarrayraw.join("") + '</div>'
        },

        outputhtmlbeautified: function() {
            return beautifyHtml(this.outputhtmlstring, {
                indent_size: 2,
                space_in_empty_paren: true
            });
        }

    },


  async mounted() {
  }
}

</script>


<template >

<div class="flex flex-col">
    <div class="bb m-1 p-1">Fastest HTML Slinger in the West</div>
    <div class="flex flex-row h-full border m-1 bred">
        <InputWidget v-model="userinputtext" :initialValue="userinputtext" @enterpressed="enterpressed"/>
        <div class="bb bg-gray-200 m-1 p-1 flexcol w-full">
            <div>Raw HTML Output</div>
            <pre class="p-1 m-1 bg-gray-100 text-xs">{{outputhtmlbeautified}}</pre>
        </div>
        
    </div>
    <div class="bb m-2 p-2">
            <h3 class="font-bold mb-2">Rendered HTML</h3>
            <div class="bb" v-html="outputhtmlstringwithstyletag"></div>
            <div class="bb" v-html="outputhtmlstring"></div>
    </div>
    <div class="flexrow">
        <div class="text-xs bb m-1 p-1">
            <div>Tag Table</div>
            <div>
                <InputWidget v-model="tagTableText" :initialValue="tagTableText"/>
            </div>
        </div>
        <div class="text-xs bb m-1 p-1">
            <div>Style Tag</div>
            <InputWidget v-model="styleTagText" :initialValue="styleTagText" @enterpressed="enterpressed"/>
        </div>
    </div>
    <div class="flexrow justify-evenly rounded-md bg-green-100 bred m-1 p-1">
        <div>Focus Source</div>
        <div>Focus Tags</div>
        <div>Focus Texts</div>
        <div>Save</div>
        <div>Copy</div>
    </div>
    <div @click="loadoutputhtml" ref="outputref">Click to Load</div>
</div>
</template>

