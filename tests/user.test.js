import chai from 'chai'
import chaiHttp from 'chai-http'
import supertest from 'supertest'
import app from './../index.js'
import User from '../models/User.js'

const request = supertest(app)
chai.use(chaiHttp)
const expect = chai.expect

let userCredentials
let adminCredentials

let userToken
let adminToken

let normalUserId
let adminUserId
let thirdUserId


before(() => {
    userCredentials = {
        username: "val",
        email: "val@noxen.net",
        password: "val123"
    }

    adminCredentials = {
        username: "art",
        email: "art.prost@supinfo.com",
        password: "art123"
    }
})

describe("Enregistrement et connexion des utilisateurs", () => {
    it("Enregistrer un nouvel utilisateur", async () => {
        const response = await request
            .post("/api/auth/register")
            .send(userCredentials)

        expect(response).to.have.status(201)
        expect(response.body).to.have.property("username")
    })

    it("Connexion d'un utilisateur et définition d'un jeton", async () => {
        const response = await request
            .post("/api/auth/login")
            .send(userCredentials)

            expect(response).to.have.status(200)
            expect(response.body).to.have.property("accessToken")

        userToken = response.body.accessToken
        normalUserId = response.body._id
    })
})

describe("Inscription et connexion des administrateurs", () => {

    it("doit mettre à jour le rôle de l'utilisateur en tant qu'administrateur", async () => {
        const response = await request
            .put(`/api/users/${adminUserId}/admin`)
            .send({ isAdmin: true })

        expect(response).to.have.status(200)
        expect(response.body).to.have.property("isAdmin", true)
    })

    it("il faut se connecter à l'administrateur et mettre en place le jeton d'accès à l'administration", async () => {
        const response = await request
            .post("/api/auth/login")
            .send(adminCredentials)

            expect(response).to.have.status(200)
            expect(response.body).to.have.property("accessToken")

            adminToken = response.body.accessToken
    })
    it("doit supprimer un utilisateur en tant qu'administrateur", async () => {
        const response = await chai.request(app)
            .delete(`/api/users/${normalUserId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response).to.have.status(200);
        expect(response.body).to.have.property("message", "Utilisateur supprimé avec succès");
        
        // Vérifier que l'utilisateur a effectivement été supprimé de la base de données
        const deletedUser = await User.findById(normalUserId);
        expect(deletedUser).to.be.null;
    });
})
after(async () => {
    await User.deleteMany({})
})
