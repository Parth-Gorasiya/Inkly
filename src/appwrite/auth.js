import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){
        try{
            
           const userAccount = await this.account.create(ID.unique(), email, password, name);

           if(userAccount) {
            //call another method
            return this.login({email, password});
           }
           else{
                return userAccount;
           }
        }
        catch(err){
            throw err;
        }
    }

    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();

        }catch(err){
            console.log("Appwrite Service :: getCurrentUser :: error ", error);
        }

        return null;
    }

    async logout() {
        try{
            await this.account.deleteSessions();

        }catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();

export default authService;