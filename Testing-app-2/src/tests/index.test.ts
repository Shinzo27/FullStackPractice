import { describe, it, expect} from '@jest/globals' 
import { app } from '../index'
import request from 'supertest'

describe('POST /sum', ()=> {
    it('responds with 200 status and body', async ()=> {
        const response = await request(app).post('/sum').send({a: 1, b: 2})
        expect(response.status).toBe(200)
        expect(response.body.answer).toBe(3)
    })
})