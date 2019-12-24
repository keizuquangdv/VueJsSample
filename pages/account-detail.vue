<template>
	<v-row justify="center">
		<v-card class="mx-auto" max-width="600px">
			<v-card-text>
				<div>{{ account.billingcountry }}</div>
				<p class="display-1 text--primary">
					{{ account.name }}
				</p>
				<p>{{ account.fax }}</p>
				<div class="text--primary">
					{{ account.billingcity }}<br>
					{{ account.billingstreet }}<br>
					{{ account.billingstate }}<br>
					{{ account.currencyisocode }}<br>
					{{ account.cleanstatus }}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-btn text color="deep-purple accent-4" @click="goBack()">
					Back to the list
				</v-btn>
				<v-btn text color="secondary" class="ma-2" @click="dialog = true">
					Edit
				</v-btn>
			</v-card-actions>
		</v-card>
		<!-- edit dialog start -->
		<v-dialog v-model="dialog" persistent max-width="600px">
			<v-card>
				<v-card-title>
				<span class="headline">Update an account</span>
				</v-card-title>
				<v-card-text>
				<v-container>
					<v-row>
					<v-col cols="12">
						<v-text-field label="Account name" required hint="Name of editting account"></v-text-field>
					</v-col>

					<v-col cols="12">
						<v-text-field label="Fax" required></v-text-field>
					</v-col>
					
					<v-col cols="12">
						<v-text-field label="Password*" type="password" required></v-text-field>
					</v-col>

					<v-col cols="12" sm="6">
						<v-select
						:items="['Viet Nam', 'Japan', 'America', 'Laos']"
						label="Billing country"
						required
						></v-select>
					</v-col>
					<v-col cols="12" sm="6">
						<v-text-field label="Billing city"></v-text-field>
					</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
				</v-card-actions>
			</v-card>
			</v-dialog>
		<!-- edit dialog end -->
	</v-row>
</template>

<script>
import axios from 'axios'

export default {
  	async asyncData ({ params }) {
    	const { data } = await axios.get(`/api/getAccountDetail/${params.id}`)
    	return { account: data }
  	}
	, head () {
		return {
			account: this.account
		}
	}

	, data () {
		return {
			dialog: false
		}
	}
	, methods: {
		goBack: function() {
			this.$router.back();
		}
		
		, openDialog: function() {
			this.dialog = true;
		}
	}
}
</script>