def app

pipeline {
    agent any
    environment {
        ENV_TYPE = "production"
        PORT = 3953
        NAMESPACE = "pangosnap-com"
        REGISTRY_HOSTNAME = "pangosnap"
        REGISTRY = "registry.hub.docker.com"
        PROJECT = "pangosnap"
        DEPLOYMENT_NAME = "pangosnap-deployment"
        IMAGE_NAME = "${env.BUILD_ID}_${env.ENV_TYPE}_${env.GIT_COMMIT}"
        DOCKER_BUILD_NAME = "${env.REGISTRY_HOSTNAME}/${env.PROJECT}:${env.IMAGE_NAME}"

        NEXT_PUBLIC_BASE_URL = "https://inctagram.work/api/v1"
        NEXT_PUBLIC_GOOGLE_CLIENT_ID = "272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com"
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Unit tests') {
             steps {
                echo "Preparing started..."
                  script {
                      sh '''
                         export NVM_DIR="$HOME/.nvm"
                         [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                         nvm use --lts
                         yarn install
                         yarn test
                      '''
                  }
             }
        }
        stage('Build docker image') {
            steps {
                echo "Build image started..."
                    script {
                        app = docker.build("${env.DOCKER_BUILD_NAME}")
                        "--build-arg NEXT_PUBLIC_BASE_URL=${env.NEXT_PUBLIC_BASE_URL} " +
                        "--build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID=${env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} ."
                    }
                echo "Build image finished..."
            }
        }
        stage('Push docker image') {
             steps {
                 echo "Push image started..."
                     script {
                          docker.withRegistry("https://${env.REGISTRY}", 'pangosnap-com') {
                            app.push("${env.IMAGE_NAME}")
                        }
                     }
                 echo "Push image finished..."
             }
       }
       stage('Delete image local') {
             steps {
                 script {
                    sh "docker rmi -f ${env.DOCKER_BUILD_NAME}"
                 }
             }
        }
        stage('Preparing deployment') {
             steps {
                 echo "Preparing started..."
                     sh 'ls -ltr'
                     sh 'pwd'
                     sh "chmod +x preparingDeploy.sh"
                     sh "./preparingDeploy.sh ${env.REGISTRY_HOSTNAME} ${env.PROJECT} ${env.IMAGE_NAME} ${env.DEPLOYMENT_NAME} ${env.PORT} ${env.NAMESPACE}"
                     sh "cat deployment.yaml"
             }

        }
        stage('Deploy to Kubernetes') {
             steps {
                 withKubeConfig([credentialsId: 'prod-kubernetes']) {
                    sh 'kubectl apply -f deployment.yaml'
                    sh "kubectl rollout status deployment/${env.DEPLOYMENT_NAME} --namespace=${env.NAMESPACE}"
                    sh "kubectl get services -o wide"
                 }
             }
        }
    }
}