import { FirebaseAdmin } from '../config/firebase-admin';
import { UserInfoModel } from '../model/user-model';

export class UserService {
  private readonly admin = FirebaseAdmin.firebaseAdmin;

  public async getUsers() {
    const users: UserInfoModel[] = [];

    await this.admin
      .firestore()
      .collection('users')
      .get()
      .then(async (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => users.push(doc.data()));
      });

    return users;
  }
}
