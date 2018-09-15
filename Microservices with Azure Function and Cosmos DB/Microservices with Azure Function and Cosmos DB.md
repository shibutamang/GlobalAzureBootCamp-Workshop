## Microservice with Azure Functions and Cosmos DB ##

In this hands-on-lab you will learn basics of how to implement microservice with Azure Function and Cosmos DB. 

**Pre-requisites to being with this lab**

1. Visual Studio Code 
2. Azure Function CLI 
3. Active Azure Subscription 
4. Storage Explorer 


###Basic Setup 1 : Setting up Visual Studio Code Extension###


**Please install these three extensions in Visual Studio Code before starting the session.**

1. Azure Functions 
2. Azure Cosmos DB 
3. Azure App Service 

You can run following command to install the extension in Visual Studio Code 

`code --install-extension ms-azuretools.vscode-azureappservice`

`code --install-extension ms-azuretools.vscode-cosmosdb`

`code --install-extension ms-azuretools.vscode-azurefunctions`

![](./images/basic-setup-1.png)

After installing the extensions, please restart your Visual Studio Code and check extensions tab to see if it is showed as below or not. 

![](./images/basic-setup-2.png)



###Basic Setup 2 : Install into Azure Account ###

> Make sure you have an active subscription that you activated from the Azure Pass organizer has provided you. 

**Step 1:** Press **Ctrl + Shift + P** to open command palette 

![](./images/basic-setup-3.png)

**Step 2:** Type **Azure: Sign In** and click on **Azure: Sign In**

![](./images/basic-setup-4.png)

**Step 3:** You will see a pop-up on right bottom section, click on **Copy and Open**

![](./images/basic-setup-5.png)

**Step 4:** In the browser, paste the code that is in your clipboard and click on **Continue**

![](./images/basic-setup-6.png)

**Step 5:** You will be prompted to login with your Microsoft account that has Azure Subscription. Sign in with your account, then you will see following screen. You can close this screen and move forward. 

![](./images/basic-setup-7.png)


**Step 6:** To verify your login, press **Ctrl + Shift + P**, type and click **Azure:Select Subscriptions**

![](./images/basic-setup-8.png)

**Step 7:** After clicking **Azure: Select Subscriptions**, if you can see list of your subscriptions then, your login has worked. 

![](./images/basic-setup-9.png)


###Azure Function Setup: Movie Engine###

**Step 1:** Login to Azure Portal [https://portal.azure.com](https://portal.azure.com "https://portal.azure.com")

![](./images/azure-function-movie-engine-1.png)


**Step 2:** Click on **Create a resource** on left top position of left side bar

![](./images/azure-function-movie-engine-2.png)


**Step 3:** Click on **Compute** and then **Function App**

![](./images/azure-function-movie-engine-3.png)

**Step 4:** Enter the following details in the new blade and click **Create**
	
- **App Name:** Name of your application. This needs to be globally unique. This will be the URL for your application 
- **Subscription:** Select the subscription you have 
- **Resource Group:** Since this is the first deployment of our system, select **Create new**
- **OS:** Use **Windows** as your OS
- **Hosting Plan:** Select **Consumption Plan**
- **Location:** Choose a data center of your choice. ***(Southeast Asia is the nearest datacenter from Nepal so it will be the best choice to avoid latency)***
- **Storage:** Select **Create new**
- **Application Insights:** Select **Off**

![](./images/azure-function-movie-engine-4.png)

**When you receive deployment completed message, open the URL in browser to see if your Azure Function App is running or not.**

![](./images/azure-function-movie-engine-5.png)


###Azure Function Setup: Ticket Engine###

**Step 1:** Click on **Create a resource** on left top position of left side bar

![](./images/azure-function-movie-engine-2.png)


**Step 2:** Click on **Compute** and then **Function App**

![](./images/azure-function-movie-engine-3.png)

**Step 3:** Enter the following details in the new blade and click **Create**
	
- **App Name:** Name of your application. This needs to be globally unique. This will be the URL for your application 
- **Subscription:** Select the subscription you have 
- **Resource Group:** Since this is your second deployment of our system, select **Use Existing** and in drop down select the resource group you created earlier. 
- **OS:** Use **Windows** as your OS
- **Hosting Plan:** Select **Consumption Plan**
- **Location:** Choose a data center of your choice. ***(Southeast Asia is the nearest datacenter from Nepal so it will be the best choice to avoid latency)***
- **Storage:** Select **Create new**
- **Application Insights:** Select **Off**

![](./images/azure-function-ticket-engine-2.png)

**When you receive deployment completed message, open the URL in browser to see if your Azure Function App is running or not.**

![](./images/azure-function-movie-engine-5.png)


###Azure Function Setup: Billing Engine###

**Step 1:** Click on **Create a resource** on left top position of left side bar

![](./images/azure-function-movie-engine-2.png)


**Step 2:** Click on **Compute** and then **Function App**

![](./images/azure-function-billing-engine-1.png)

**Step 3:** Enter the following details in the new blade and click **Create**
	
- **App Name:** Name of your application. This needs to be globally unique. This will be the URL for your application 
- **Subscription:** Select the subscription you have 
- **Resource Group:** Since this is your second deployment of our system, select **Use Existing** and in drop down select the resource group you created earlier. 
- **OS:** Use **Windows** as your OS
- **Hosting Plan:** Select **Consumption Plan**
- **Location:** Choose a data center of your choice. ***(Southeast Asia is the nearest datacenter from Nepal so it will be the best choice to avoid latency)***
- **Storage:** Select **Create new**
- **Application Insights:** Select **Off**

![](./images/azure-function-ticket-engine-2.png)

**When you receive deployment completed message, open the URL in browser to see if your Azure Function App is running or not.**

![](./images/azure-function-movie-engine-5.png)


###Creating App Service for frontend application###

**Step 1:** Click on **Create a resource** on left top position of left side bar

![](./images/creating-cosmos-db/1.png)


**Step 2:** Click on **Web + Mobile ** and then **Web App**

![](./images/creating-app-service/1.png)


**Step 3:** Enter the following details in the new blade 
	
- **App Name:** Name of your app service. This needs to be globally unique 
- **Subscription:** Select the subscription you have 
- **Resource Group:** Since this is your second deployment of our system, select **Use Existing** and in drop down select the resource group you created earlier. 
- **OS:** Choose **Windows**
- **Application Insight:** Select **Off**
  
![](./images/creating-app-service/2.png)

**Step 4**: Select **App Service Plan/Location** and follow following steps 

- Click on **Create new**
- Enter name of your **App Service Plan**
- Select **Location** (Southeast Asia recommended)
- Click on **Pricing Tier**
- Select a **Pricing Tier** (B1 Basic recommended)
- Click **Select**
- Click **Ok**

![](./images/creating-app-service/3.png)

**Step 5**: Click **Create**

![](./images/creating-app-service/4.png)

**Open the URL after deployment has been completed, you will see the following screen**

![](./images/creating-app-service/5.png)

###Creating Cosmos DB Account###

**Step 1:** Click on **Create a resource** on left top position of left side bar

![](./images/creating-cosmos-db/1.png)


**Step 2:** Click on **Databases** and then **Azure Cosmos DB**

![](./images/creating-cosmos-db/2.png)


**Step 3:** Enter the following details in the new blade and click **Create**
	
- **ID:** Name of your Cosmos DB account. This needs to be globally unique 
- **API:** Select **SQL** as API
- **Subscription:** Select the subscription you have 
- **Resource Group:** Since this is your second deployment of our system, select **Use Existing** and in drop down select the resource group you created earlier. 
- **Location:** Choose a data center of your choice. ***(Southeast Asia is the nearest datacenter from Nepal so it will be the best choice to avoid latency)***
- **Enable geo-redundancy:** Untick it. 


![](./images/creating-cosmos-db/3.png)


###Creating Cosmos DB Database : Movie Database ###

**Step 1:** After Cosmos DB account has been created, open your Cosmos DB account by clicking on **All Services **, searching for **Cosmos DB** and selecting the account you created in early step 

![](./images/creating-cosmos-db/4.png)

**Step 2:** Click on **Overview** then **Add Collection**

![](./images/creating-cosmos-db/5.png)


**Step 3:** You will be redirected to **Data Explorer** tab then do the following 

- **Database id:** Select **Create new** enter **MovieDatabase**
- **Collection id:** Enter **UpcomingShows**
- **Storage capacity:** Select **Fixed(10 GB)**
- **Throughput:** Enter **400**
- Click **Ok**


![](./images/creating-cosmos-db/6.png)


###Creating Cosmos DB Database : Ticket Database ###

**Step 1:** After **MovieDatabase** has been deployed, click on **New collection**

![](./images/creating-cosmos-db/7.png)

**Step 2:** On **Add Collection** tab do the following 

- **Database id:** Select **Create new** and enter **TicketDatabase**
- **Collection id:** Enter **TicketOrders**
- **Storage capacity:** Select **Fixed(10 GB)**
- **Throughput:** Enter **400**
- Click **Ok**


![](./images/creating-cosmos-db/8.png)


###Deploying Ticket Engine using Visual Studio Code ###

**Step 1:** Extract the zip folder provided at the workshop 

![](./images/deploying-functions/1.png)


**Step 2:** Open **Visual Studio Code**, click **Open folder** and select **TicketEngine** root folder

![](./images/deploying-functions/2.png)


**Step 3:** Expand **Azure Function** section and click on **Deploy to function** icon 

![](./images/deploying-functions/3.png)


**Step 4:** On **Select the folder to zip and deploy** select current folder 

![](./images/deploying-functions/4.png)


**Step 5:** On **Select a Subscription** select your subscription

![](./images/deploying-functions/5.png)


**Step 6:** On **Select a Function App** select your function application

![](./images/deploying-functions/6.png)


**Step 7:** If the following menu pops up, click on **Select Runtime** and click **beta (Preview)**

![](./images/deploying-functions/7.png)

![](./images/deploying-functions/8.png)

**Step 8:** Click on deploy 

![](./images/deploying-functions/9.png)


**Step 8:** After deployment is completed, you will see this screen which means your deployment is completed. 

![](./images/deploying-functions/10.png)

**Repeat the same procedure for MovieEngine, BillingEngine**

###Deploying Book My Show Web App using Visual Studio Code ###

**Step 1:** Open **Visual Studio Code**, click **Open folder** and select **BookMyShow** root folder

![](./images/deploy-app-service/0.png)

**Step 2:** Open **config.js** and change URL of **MovieEngine** and **TicketEngine** to what you created in early exercise. 

![](./images/deploy-app-service/1.png)

**Step 3:** Expand **Azure App Service** section and click on **Deploy to web** icon 

![](./images/deploy-app-service/2.png)

**Step 4:** On **Select the folder to zip and deploy** select current folder 

![](./images/deploy-app-service/3.png)

**Step 5:** On **Select a Subscription** select your subscription

![](./images/deploy-app-service/4.png)


**Step 6:** On **Select a Web App** select your web application

![](./images/deploy-app-service/5.png)

**Step 7:** Click on **Deploy**

![](./images/deploy-app-service/6.png)


###Configurations to change ###


####BillingEngine####

`emailAddress` : `email@rvimandal.com`

`emailPassword` : `Nep@l@123`


####MoviesEngine####

`CosmosDBHost` : Host of CosmosDB account you created

`CosmosDBAuthKey` : Primary key of CosmosDB account


`DatabaseId` : `MovieDatabase`

`CollectionId` : `UpcomingShows`

####TicketEngine####

`CosmosDBHost` : Host of CosmosDB account you created

`CosmosDBAuthKey` : Primary key of CosmosDB account


`DatabaseId` : `TicketDatabase`

`CollectionId` : `TicketOrders`

`MovieEngineUrl` : URL of Movies Engine Azure Function

`BillingEngine` : URL of Billing Engine Azure Function 

`EventGridTopicEndpoint` : `<empty>`

`EventGridTopicAuthKey` : `<empty>`

`EventTriggerType` : `HTTP`