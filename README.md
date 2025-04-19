# biritto-auth

>npm init -y

>npm install express mongoose bcryptjs jsonwebtoken cookie-parser dotenv nodemailer

>npm install --save-dev nodemon

# install docker
> sudo apt update

> sudo apt  install docker

> sudo apt  install docker-compose

# Install Java
> sudo apt update

> sudo apt install openjdk-17-jdk -y

>java -version

# install Jenkins
> curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

>echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

>sudo apt-get update
>sudo apt-get install jenkins -y

# Retrieve the initial admin password
> sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Get access to the Jenkins
http://[your server addredd/ip]:8080
# Note
If you are using the EC2 please check and config the Inbound Rouls from Security Group 

# Jenkins permission
If you face issue access permission. Run comands below,
> sudo usermod  -a -G docker jenkins

> sudo usermod  -a -G jenkins  $USER

> Systemctl restart jenkins

# Note
If you are using the EC2 and trying to access MongoDB from cloud.mongodb.com please check and config the Outbound Rouls from Security Group and add the EC2 IP into the mongodb white list from Network Access.