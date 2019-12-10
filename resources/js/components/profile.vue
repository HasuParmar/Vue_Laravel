<style>
.widget-user .widget-user-header{
    background-position: center center;
    background-size : cover;
    height: 300px;
}
</style>


<template>
    <div class="container">
        <div class="row ">
            <div class="col-md-12 mt-3">
                <div class="box box-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header bg-white" style="background-image: url('./img/download.jpg')">
                        <h3 class="widget-user-username" style="color:white;">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc" style="color:white;">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="box-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">

                        <li class="active"><a href="#settings" data-toggle="tab" aria-expanded="true">Settings</a></li>
                    </ul>
                    <div class="tab-content">

                        <div class="tab-pane active" id="settings">
                            <form class="form-horizontal" >

                                <div class="form-group">
                                    <label for="inputName"  class="col-md-2 control-label">Name</label>

                                    <div class="col-md-10">
                                        <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                                    <div class="col-sm-10">
                                        <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                                    <div class="col-sm-10">
                                        <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputFile" class="col-sm-2 control-label">File input</label>

                                    <div class="col-sm-7">
                                        <input type="file" name="photo" @change="updateProfile" id="exampleInputFile">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputSkills" class="col-sm-2 control-label">Skills</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="submit" @click.prevent="updateInfo" class="btn btn-success">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
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
        created() {
            axios.get("api/profile")
                .then(({ data }) => (this.form.fill(data)));
        },
        methods: {
            updateInfo() {
                this.form.put('api/profile/')
                .then(()=>{

                })
                .catch(() => {

                });
            },
            getProfilePhoto() {
                return "img/download.jpg";
            },
            updateProfile(e) {
               // console.log("TEsss");
                let file = e.target.files[0];

                let reader = new FileReader();

                reader.onloadend = (file) => {

                    this.photo = reader.result;
                }
                reader.readAsDataURL(file);
            }
        },

    }
</script>
