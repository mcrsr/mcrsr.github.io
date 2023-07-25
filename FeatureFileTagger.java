import java.io.*;
import java.nio.file.*;
import java.util.*;
import org.json.*;

public class FeatureFileTagger {

    public static void main(String[] args) {
        String featureFilePath = "/home/ranga/IdeaProjects/cucumberTutorial/src/test/resources/example.feature";
        String tagMappingFilePath = "/home/ranga/IdeaProjects/cucumberTutorial/src/test/java/mapping.json";
        try {
            String featureFileContent = readFeatureFile(featureFilePath);
            JSONObject tagMapping = readTagMapping(tagMappingFilePath);
            String taggedFeature = addTagsToFeature(featureFileContent, tagMapping);

            // Update the original feature file with the tagged content
            writeFeatureFile(featureFilePath, taggedFeature);

            System.out.println("Tags added successfully!");
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
    }

    private static String readFeatureFile(String filePath) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filePath)));
    }

    private static JSONObject readTagMapping(String filePath) throws IOException, JSONException {
        String mappingContent = new String(Files.readAllBytes(Paths.get(filePath)));
        return new JSONObject(mappingContent);
    }

    private static String addTagsToFeature(String featureContent, JSONObject tagMapping) {
        StringBuilder taggedFeature = new StringBuilder();

        // Split feature content into lines
        String[] lines = featureContent.split(System.lineSeparator());

        for (int i = 0; i < lines.length; i++) {
            // Check if the line contains "Examples:"
            if (lines[i].trim().startsWith("Examples:")) {
                // Find the corresponding testcaseid for this "Examples" section
                String testcaseid = findTestcaseIDForExamples(lines, i);

                if (testcaseid != null) {
                    // Check if there are tags for the current testcaseid
                    JSONArray tagsArray = tagMapping.optJSONArray(testcaseid);
                    if (tagsArray != null) {
                        // Append the tags right above the "Examples" section
                        for (int j = 0; j < tagsArray.length(); j++) {
                            taggedFeature.append(tagsArray.getString(j)).append(" ");
                        }
                        taggedFeature.append(System.lineSeparator());
                    }
                }
            }

            taggedFeature.append(lines[i]).append(System.lineSeparator());
        }

        return taggedFeature.toString();
    }

    private static String findTestcaseIDForExamples(String[] lines, int examplesLineIndex) {
        // Find the testcaseid header from the Examples table
        String[] headers = lines[examplesLineIndex + 1].trim().split("\\|");
        int testcaseidIndex = Arrays.asList(headers).indexOf(" testcaseid ");

        // Find the testcaseid value for this "Examples" section
        for (int i = examplesLineIndex + 2; i < lines.length; i++) {
            String[] exampleValues = lines[i].trim().split("\\|");
            String testcaseid = exampleValues[testcaseidIndex].trim();

            if (!testcaseid.isEmpty()) {
                return testcaseid;
            }
        }

        return null;
    }

    private static void writeFeatureFile(String filePath, String content) throws IOException {
        Files.write(Paths.get(filePath), content.getBytes());
    }
}
