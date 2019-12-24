<template>
  <!-- <v-layout>
    <v-flex class="text-center">
		<div class="container">
			<h1>{{ title }}</h1>
			<ul>
				<li v-for="(acc, index) in accountLst" :key="index">
					<NuxtLink :to="{ name: 'account-detail', params: { id: acc.id } }">
					{{ acc.name }}
					</NuxtLink>
				</li>
			</ul>
			<p>
			<NuxtLink to="/">
				Back to home page
			</NuxtLink>
			</p>
		</div>
    </v-flex>
  </v-layout> -->
  	<div>
		<v-data-table
			:headers="headers"
			:items="desserts"
			:page.sync="page"
			:items-per-page="itemsPerPage"
			hide-default-footer
			@click:row="rowClicked($event)"
			class="elevation-1"
			@page-count="pageCount = $event"
		>
			<template v-slot:items="{ props }">
				<tr @click="showAlert(props.item)" :class="{'primary': props.item.id===selectedId}">>
					<td>{{ props.item.name }}</td>
					<td>{{ props.item.billingcity }}</td>
					<td>{{ props.item.billingstreet }}</td>
					<td>{{ props.item.billingstate }}</td>
					<td>{{ props.item.billingcountry }}</td>
					<td>{{ props.item.currencyisocode }}</td>
					<td>{{ props.item.fax }}</td>
				</tr>
			</template>
			<template v-slot:item.currencyisocode="{ item }">
				<v-chip :color="getColor(item.currencyisocode)" dark>{{ item.currencyisocode }}</v-chip>
			</template>
		</v-data-table>
		<div class="text-center pt-2">
			<v-pagination v-model="page" :length="pageCount"></v-pagination>
		</div>
  	</div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    const { data } = await axios.get('/api/getAccount')
    return { desserts: data }
  },
  data () {
	return {
		// accountLst: this.accountLst
		// , 
		page: 1
        , pageCount: 0
        , itemsPerPage: 5
		, title: 'Account list'
		, selectedId: -1
		, headers: [
				{ text: 'Name', align: 'left', sortable: false, value: 'name' },
				{ text: 'Billing city', value: 'billingcity' },
				{ text: 'Billing street', value: 'billingstreet' },
				{ text: 'Billing state', value: 'billingstate' },
				{ text: 'Billing country', value: 'billingcountry' },
				{ text: 'Currency', value: 'currencyisocode' },
				{ text: 'Fax', value: 'fax' },
			]
		// , desserts: this.accountLst
	}
  },

  methods: {
		rowClicked: function(item) {
			
			this.$router.push({ name: 'account-detail', params: { id: item.id }})
		}
		, getColor: function (currencyisocode) {
			if (currencyisocode == 'USD') return 'red'
			else if (currencyisocode == 'VND') return 'orange'
			else return 'green'
      }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41B883;
}
</style>
