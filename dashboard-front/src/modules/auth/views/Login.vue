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
                       <v-toolbar-title>{{ texts.toolBar }}</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-form>
                             <v-text-field 
                                v-if="!isLogin"
                                prepend-icon="person"
                                name="name"
                                label="Nome"
                                type="text" 
                                 :success="!$v.user.name.$invalid"
                                :error-messages="nameErrors"
                                v-model.trim="$v.user.name.$model"                              
                            ></v-text-field>
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
                            depressed
                            @click="isLogin = !isLogin">
                                {{ texts.button }}</v-btn>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :disabled="$v.$invalid"
                            color="primary"
                            large
                            @click="submit"
                        >{{  texts.toolBar }}</v-btn>                        
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
        isLogin: true,
        user: {
            name: '',
            email: '',
            password: ''
        }
    }),
    validations() {
        const validations = {
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
        }

        if(this.isLogin) {return validations}

        return {
            user: {
                ...validations.user,
                name: {
                    required,
                     minLength: minLength(3)
                }               
            }
        }

    },
    computed: {
        texts () {
            return this.isLogin
            ? { toolBar: "Entrar", button: "Criar conta"}
            : { toolBar: "Criar conta", button: "Já tenho uma conta"}
        },
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
        },

        nameErrors () {
            const errors = []
            const name = this.$v.user.name
            if(!name.$dirty) { return errors }
            // Não precisa de IF
            !name.required && errors.push('Nome é obrigatorio!')
            !name.minLength && errors.push(`O nome deve ser maior que ${name.$params.minLength.min}`)

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
