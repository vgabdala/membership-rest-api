import express from 'express'
import mongoose from 'mongoose'
import {createMember, viewMember, updateMember, deleteMember, listMembers} from '../controller/controller'

const routes   = express.Router() 

// List Members
routes.get('/member', listMembers)

//Create Member
routes.post('/member', createMember)

//View Member
routes.get('/member/:memberId', viewMember)

//Edit Member
routes.patch('/member/:memberId', updateMember)

//Delete Member
routes.delete('/member/:memberId', deleteMember)

export default routes;