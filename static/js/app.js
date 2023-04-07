// Set provided URL to constant variable
const samples_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Set function to create charts
function buildCharts() {
        
    // Use d3 library to read provided JSON data and console log it
    d3.json(samples_url).then(function(data) {
            console.log('Full Data');
            console.log(data);
            
            // Set variable for sample_values, obtain top 10 and reverse due to Plotly defaults
            let sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
                console.log('Sample Values');
                console.log(sampleValues);
            
            // Set variable for otu_ids
            let otuIds = data.samples[0].otu_ids;
                console.log('OTU IDs');
                console.log(otuIds);

            // Set variable for otu_labels, obtain top 10 and reverse
            let otuLabels = data.samples[0].otu_labels.slice(0,10).reverse();
                console.log('OTU Labels');
                console.log(otuLabels);
            
            // Set variable for top 10 otu_ids and reverse
            let topOtuIds = data.samples[0].otu_ids.slice(0,10).reverse();
            
            // Set variable for otu_id_labels
            let otuIdLabels = topOtuIds.map(d => "OTU " + d);
                console.log(`OTU IDs: ${otuIdLabels}`);

            // Create bar chart
            let trace1 = {
                x: sampleValues,
                y: otuIdLabels,
                text: otuLabels,
                type: "bar",
                orientation: "h"
            };

            // Set title and parameters for bar chart
            let layout1 = {
                title: "Top 10 OTUs Present",
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
                }
            };

            // Display bar chart
            Plotly.newPlot("bar", [trace1], layout1);
            
            // Create bubble chart
            let trace2 = {
                x: data.samples[0].otu_ids,
                y: data.samples[0].sample_values,
                mode: "markers",
                marker:{
                    size: data.samples[0].sample_values,
                    color: data.samples[0].otu_ids
                },
                text: data.samples[0].otu_labels
            };

            // Set title and parameters for bubble chart
            let layout2 = {
                title: "OTU Counts",
                xaxis: {title: "OTU ID"},
                height: 500,
                width: 1100,
            };

            // Display bubble chart
            Plotly.newPlot("bubble", [trace2], layout2);

            // Enter array data into dropdown
            let dropDown = document.getElementById('selDataset');
            let defaultOption = document.createElement('option')
            options = data.names
            
            for (i = 0; i < options.length; i++){
                option = document.createElement('option');
                option.text = options[i];
                option.value = options[i];
                dropDown.add(option);
            };
            
            // Alternative method
            // let dropDown = d3.select("#selDataset");
            // let names = data.names 
            //     for (let i = 0; i < names.length; i++){
            //         console.log(data[names[i]])
            //         dropDown.append("option").text(names[i]).property("value", names[i]);
            //     };

            // Obtain and log metadata from DataSet
            let metadata = data.metadata;
                console.log("Metadata")
                console.log(metadata);

            // Set default id for dropdown
            let id = 940;

            // Filter metadata based on selected ID
            let metafilter = metadata.filter(meta => meta.id === id)[0];
                console.log(metafilter);
            
            // Set demographic info variable
            let demoInfo = d3.select("#sample-metadata");
            demoInfo.html("");
            
            // 
            Object.entries(metafilter).forEach((key) => {
                demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            });
        });
    };

// Create function for change of dropdown selection
d3.selectAll("#selDataset").on("change", getInfo);

function getInfo() {

    dropDownChange = d3.select("#selDataset");
    idInfo = dropDownChange.property("value");
    console.log(idInfo);
    d3.json(samples_url).then(function(data) {
        idNo = data.names;
        for (i = 0; i < idNo.length; i++) {
            if (idInfo == idNo[i]) {
                
                // Update Bar and Bubble Plots

                // Set new variables for data
                console.log("Plot update successful")
                let sampleValues = data.samples[i].sample_values.slice(0,10).reverse();
                let otuLabels = data.samples[i].otu_labels.slice(0,10).reverse();
                let topOtuIds = data.samples[i].otu_ids.slice(0,10).reverse();
                let otuIds = data.samples[i].otu_ids;
                let otuIdLabels = topOtuIds.map(d => "OTU " + d);

                // Update bar plot data
                let trace1 = {
                    x: sampleValues,
                    y: otuIdLabels,
                    text: otuLabels,
                    type: "bar",
                    orientation: "h"
                };

                // Set title for new bar plot
                let layout1 = {
                    title: "Top 10 OTUs Present",
                    margin: {
                        l: 100,
                        r: 100,
                        t: 100,
                        b: 100
                    }
                };

                // Update bubble chart
                let trace2 = {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                    mode: "markers",
                    marker:{
                        size: data.samples[i].sample_values,
                        color: data.samples[i].otu_ids
                    },
                    text: data.samples[i].otu_labels
                };

                let layout2 = {
                    title: "OTU Counts",
                    xaxis: {title: "OTU ID"},
                    height: 500,
                    width: 1100
                };

                // Update demographic info
                let metadata = data.metadata;
                    console.log(metadata);
                
                // Update metadata filter
                let metafilter = metadata.filter(meta => meta.id === +idInfo)[0];

                let demoInfo = d3.select("#sample-metadata");
                demoInfo.html("");
                console.log(metafilter)

                Object.entries(metafilter).forEach((key) => {
                    demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
                });
        updatePlotly([trace1], [trace2], metafilter)
            }
        }
    });
}

function updatePlotly([trace1], [trace2], metafilter) {
    let layout1 = {
        title: "Top 10 OTUs",
        xaxis: {
            title: {
                text: 'OTU IDs'}}
        };
    
    let layout2 = {
        height: 500,
        width: 1100,
        title: 'OTU Counts',
        xaxis: {
            title: {
                text: 'OTU IDs'}}
        };
    Plotly.newPlot('bar', [trace1], layout1);
    Plotly.newPlot('bubble', [trace2], layout2);

    box = d3.selectAll('#sample-metadata');
    box.html('');

    Object.entries(metafilter).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        box.append('ul').text(`${key}: ${value}`);
    });
}

getInfo();
buildCharts();




