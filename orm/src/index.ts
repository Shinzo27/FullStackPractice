import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })
    console.log(res);
}

// insertUser('admin1','123456',"Pratham","Patel")

interface UpdateParams {
    firstName: string
    lastName: string
}

async function updateUser(username:string, {
    firstName,
    lastName
}: UpdateParams) {
    const res = await prisma.user.update({
        where: { username },
        data: {
            firstName,
            lastName
        }
    })
    console.log(res)
}

// updateUser("admin1", {
//     firstName: "Shinzo",
//     lastName: "27k"
// })

async function getUser(username:string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    console.log(user)
}

// getUser('admin1')

async function createTodo(userId:number, title: string, description: string, done: boolean) {
    const res = await prisma.todos.create({
        data: {
            title,
            description,
            userId,
            done
        }
    })
    console.log(res);
}

// createTodo(1,"Go to gym","Go to gym at 6pm",false)

async function getTodos(userId:number) {
    const todos = await prisma.todos.findMany(
        {
            where: {
                userId: userId
            }
        }
    )
    console.log(todos);
}

// getTodos(1)

async function getTodosWithUserDetails(userId:number) {
    const todos = await prisma.todos.findMany({
        where: {
            userId: userId
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    })
    console.log(todos);
}

getTodosWithUserDetails(1)