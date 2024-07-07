const supertest = require('supertest');
const app = require('./app');
const request = require('supertest');



describe('API de posts', () => {

    let id;

    it('deve listar todos os posts', async () => {
        await request(app)
            .get('/posts')
            .expect((res) => {
                expect(res.status).toBe(200)
                expect(res.body).toStrictEqual([])
            })
    })

    it('deve fazer o envio de uma postagem', async () => {
        await request(app)
            .post('/posts')
            .send({ title: 'string', content: 'string' })
            .expect((res) => {
                expect(res.status).toBe(201)
                expect(res.body.id).not.toBe(0)
                id = res.body.id
            })
    })

    it('deve atualizar os dados de uma postagem', async () => {
        await request(app)
            .put(`/posts/${id}`)
            .send({ title: 'gato', content: 'rato' })
            .expect((res) => {
                expect(res.status).toBe(200)
                expect(res.body.title).toBe('gato')
                expect(res.body.content).toBe('rato')
                // expect(res.body).toStrictEqual({ id: 1, title: 'gato', content: 'rato' })
            })
    })


    it('deve obter uma postagem através do id fornecido', async () => {
        await request(app)
            .get(`/posts/${id}`)
            .expect((res) => {
                expect(res.status).toBe(200)
                expect(res.body).toStrictEqual({ id: id, title: "gato", content: "rato" })
            })
    })

    it('deve remover uma postagem', async () => {
        await request(app)
            .delete(`/posts/${id}`)
            .expect((res) => {
                expect(res.status).toBe(204)
            })
    })
})