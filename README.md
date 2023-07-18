Here is a link to the published github page: https://grimmandrewj.github.io/Belly_Button_Challenge/

# Goal
- In this assignment, I was tasked with building an interactive dashboard to explore a provided Belly Button Biodiversity dataset.
- The dataset catalogs the microbes that colonize human navels identified by microbial species (operational taxonomic units, or OTUs).
- The dashboard was to include a dropdown list of test subjects, which would then update/repopulate data visulizations with the corresponding data.

# Method
- First, I assigned the provided url to a variable and created a function to build the charts
- I utilized the d3 library to read the dataset and set each of the values to variables (sample_values, OTU IDs, OTU Labels) and built a bar chart based on the data:

![image](https://user-images.githubusercontent.com/120341249/230537731-cb0e93d1-09fb-4613-a1f7-060e82fcff2c.png)

- I then utilized the same data to build a bubble chart to demonstrate the OTU ID numbers and the OTU Counts:

![image](https://user-images.githubusercontent.com/120341249/230536830-258c7e6d-b76a-460d-9310-c3ccbb0b20e2.png)

- Then, I obtained the data with which to populate the dropdown button (Test Subject IDs) and filtered the metadata

- The demographic information corresponding to each Subject ID was set to a variable, and a function was created to populate the appropriate data upon each selection change in the dropdown list: 

![image](https://user-images.githubusercontent.com/120341249/230536612-399dcca5-a429-4cc6-96d9-f03a07ca8eac.png)

- The appropriate variables were then set to reflect the change in dropdown selection, and the functions to update the bar and bubble chart depending on the selection

# Summary and Results
- The resulting html dashboard has been published to github pages (site shown above)
- The dropdown list has been populated with the Test Subject IDs appropriately
- The change in dropdown selection updates both the bar and bubble chart with the corresponding data for the respective Test Subject ID
- As noted in the challenge instructions, a small handful of OTUs were present in more than 70% of people while the rest are relatively rare
