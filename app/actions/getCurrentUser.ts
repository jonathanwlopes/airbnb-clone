import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/app/libs/prismadb"

const getSession = async () => await getServerSession(authOptions)

const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) return null

    return currentUser
  } catch (e) {
    return null
  }
}

export default getCurrentUser
