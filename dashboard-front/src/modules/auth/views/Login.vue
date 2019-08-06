<template>
    <v-container fill-height>
        <v-layout
            justify-center
            align-center
        >

            <v-flex 
                xs12 
                sm6 
                md4 
                lg8
                x13
            ><!-- Elevation gera sombreado-->
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark>
                       <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-form>
                            <v-text-field 
                                prepend-icon="email"
                                name="email"
                                label="Email"
                                type="email"
                                :success="!$v.user.email.$invalid"
                                :error-messages="emailErrors"
                                v-model.trim="$v.user.email.$model"
                            ></v-text-field>
                             <v-text-field 
                                prepend-icon="lock"
                                name="password"
                                label="Senha"
                                type="password"
                                :success="!$v.user.password.$invalid"
                                :error-messages="passwordErrors"
                                v-model.trim="$v.user.password.$model"
                            ></v-text-field>
                            <v-btn 
                            block 
                            depressed>
                                Criar Conta</v-btn>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :disabled="$v.$invalid"
                            color="primary"
                            large
                            @click="submit"
                        >Login</v-btn>                        
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>       
    </v-container>
</template>


<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data: () => ({
        user: {
            email: '',
            password: ''
        }
    }),
    validations: {
        user: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            }
        }
    },
    computed: {
        emailErrors () {
            const errors = []
            const email = this.$v.user.email
            if(!email.$dirty) { return errors }
            // Não precisa de IF
            !email.required && errors.push('Email é obrigatorio!')
            !email.email && errors.push('Este email não é valido!')

            return errors
        },

        passwordErrors () {
            const errors = []
            const password = this.$v.user.password
            if(!password.$dirty) { return errors }
            // Não precisa de IF
            !password.required && errors.push('Senha é obrigatorio!')
            !password.minLength && errors.push(`A senha deve ser maior que ${password.$params.minLength.min}`)

            return errors
        }
    },
    methods: {
        submit() {
            console.log('User', this.user)
        }
    }
}
</script>
