<template>
    <div class="container">
        <div class="row mt-5" v-if="$gate.isAdminOrAuthor()">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">User Table</h3>

                        <div class="box-tools" align="right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addnew" @click="newModal()">Add New <i class="fa fa-user-plus"></i></button>
                        </div><br>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody bgcolor="white"><tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered At</th>
                                <th>Modify</th>
                            </tr>

                            <tr v-for = "user in users.data" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.type | capitalize }}</td>
                                <td>{{ user.created_at | myDate }}</td>
                                <td><a href="#" @click="editModal(user)"><i class="fa fa-edit blue"></i></a>/<a href="#"><i class="fa fa-trash red" @click="deleteUser(user.id)"></i></a></td>
                            </tr>

                            </tbody></table>
                    </div>
                    
                    <div class="card-footer">
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>

        <div v-if="!$gate.isAdminOrAuthor()">
            <not-found></not-found>
        </div>

        <div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="addnewTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="!editMode" id="addnewTitle">Add New</h5>
                        <h5 class="modal-title" v-if="editMode">Update User Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="editMode ? updateuser() : createuser()">
                        <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name"
                                   placeholder="Enter Name"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="text" name="email"
                                   placeholder="Email Address"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" type="text" name="bio"
                                   placeholder="Short Bio for User(Optional)"
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid' : form.errors.has('type')}">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password"
                                   placeholder="Password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-if="!editMode" class="btn btn-info">Create</button>
                        <button type="submit" v-if="editMode" class="btn btn-info">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
          return {
              editMode : false,
              users : {},
              form: new Form({
                  id: '',
                  name: '',
                  email: '',
                  password: '',
                  type: '',
                  bio: '',
                  photo: ''
              })
          }
        },
        methods : {
            getResults(page = 1) {
                axios.get('api/user?page=' + page)
                    .then(response => {
                        this.users = response.data;
                    });
            },
            updateuser(id) {
                //console.log("Edit Successfully.");
                this.form.put('api/user/'+this.form.id)
                .then(() =>  {
                    $('#addnew').modal('hide');

                    Swal.fire(
                        'Updated!',
                        'Information has been Updated.',
                        'success'
                    )

                    Fire.$emit('AfterCreate');
                })
                .catch(() => {

                })
            },
            editModal(user){
                this.editMode = true;
                this.form.reset();
                $('#addnew').modal('show');
                this.form.fill(user);
            },
            newModal(){
                this.editMode = false;
                this.form.reset();
                $('#addnew').modal('show');
            },
            deleteUser(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                        if(result.value) {
                            this.form.delete('api/user/' + id).then(() => {

                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('AfterCreate');
                            }).catch(() => {
                                Swal("Failed", "There was Something Wrong.", "warning");
                            });
                        }
                })
            },
            loadUsers(){
                if(this.$gate.isAdminOrAuthor) {
                    axios.get("api/user").then(({ data }) => (this.users = data));
                }
            },
            createuser(){
                this.form.post('api/user');
                Fire.$emit('AfterCreate');

                $('#addnew').modal('hide');

            }
        },
        created() {
            Fire.$on('searching',() => {
                let query = this.$parent.search;
                axios.get('api/findUser?q=' + query)
                .then((data) => {
                    this.users = data.data
                })
                .catch(() => {

                })
            })
            this.loadUsers();
            Fire.$on('AfterCreate',() => {
               this.loadUsers();
            });
            // setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
